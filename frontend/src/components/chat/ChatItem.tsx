import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Type for extracted code snippet 
interface CodeBlock {
  language: string;
  code: string;
}

// Extracted code blocks from a text
const extractCodeBlocks = (text: string): CodeBlock[] => {
  text = text.replace(/\[\d+\]\s?/g, ""); // Remove line numbers
  text = text.replace(/<code><\/code>`/g, "```"); // Fix broken <code> tags

  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  let extracted: CodeBlock[] = [];

  while ((match = regex.exec(text)) !== null) {
    let language = match[1] || "plaintext"; // Default to plaintext if no language
    let code = match[2].trim();
    extracted.push({ language, code });
  }

  return extracted;
};

// Check if a given string is a code block
const isCodeBlock = (str: string): boolean => {
  const patterns = [
    /[\{\}\[\]\(\)]/, // Braces, brackets, parentheses
    /\b(function|let|const|var|return|class|import|export)\b/, // Keywords
    /[\+\-\*\/\=\!]/, // Operators
    /\/\/.*$/, // Single-line comments
    /\/\*[\s\S]*?\*\// // Multi-line comments
  ];

  return patterns.some(pattern => pattern.test(str));
};

// Check if a string contains HTML
const containsHTML = (str: string): boolean => {
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  return htmlTagRegex.test(str);
};

// Props for ChatItem component
interface ChatItemProps {
  content: string;
  role: "user" | "assistant";
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const auth = useAuth();
  const messageBlocks = extractCodeBlocks(content);
  const hasHTML = containsHTML(content);

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: role === "assistant" ? "#004d5612" : "#004d56",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: role === "assistant" ? "inherit" : "black", color: "white" }}>
        {role === "assistant" ? (
          <img src="openai.png" alt="openai" width={"30px"} />
        ) : (
          <>
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1]?.[0]}
          </>
        )}
      </Avatar>

      <Box>
        {/* If no code blocks, render normal text */}
        {messageBlocks.length === 0 ? (
          hasHTML ? (
            <Typography sx={{ fontSize: "20px", whiteSpace: "pre-line", mb: 1 }} dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <Typography sx={{ fontSize: "20px", whiteSpace: "pre-line", mb: 1 }}>{content}</Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block.code) ? (
              <Box key={index} sx={{ bgcolor: "#282c34", p: 2, borderRadius: 1, mb: 1 }}>
                <SyntaxHighlighter language={block.language} style={coldarkDark} wrapLongLines={true}>
                  {block.code}
                </SyntaxHighlighter>
              </Box>
            ) : hasHTML ? (
              <Typography key={index} sx={{ fontSize: "20px", whiteSpace: "pre-line", 
              wordBreak: "break-word", mb: 1 }} dangerouslySetInnerHTML={{ __html: block.code }} />
            ) : (
              <Typography key={index} sx={{ fontSize: "20px", whiteSpace: "pre-line", wordBreak: "break-word", 
              overflowWrap: "break-word",  mb: 1 }}>{block.code}</Typography>
            )
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
