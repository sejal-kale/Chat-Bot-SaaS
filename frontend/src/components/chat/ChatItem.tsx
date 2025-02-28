import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Function to extract code blocks from a message string
function extractCodeFromString(message: string): string[] {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks.filter(block => block.trim() !== ""); // filter out empty strings if any
  }
  return [];
}

// Function to check if a string is a code block
function isCodeBlock(str: string): boolean {
  const codePatterns = [
    /[\{\}\[\]\(\)]/, // Matches curly braces, square brackets, and parentheses
    /\bfunction\b/,    // Matches the word "function"
    /\blet\b/,         // Matches the word "let"
    /\bconst\b/,       // Matches the word "const"
    /\bvar\b/,         // Matches the word "var"
    /\breturn\b/,      // Matches the word "return"
    /\bclass\b/,       // Matches the word "class"
    /\bimport\b/,      // Matches the word "import"
    /\bexport\b/,      // Matches the word "export"
    /[\+\-\*\/\=\!]/,   // Matches common operators
    /\/\/.*$/,         // Matches single-line comments (//)
    /\/\*[\s\S]*\*\//  // Matches multi-line comments (/* */)
  ];

  // Check if any code pattern is present in the string
  for (let pattern of codePatterns) {
    if (pattern.test(str)) {
      return true; // It's a code block
    }
  }

  return false; // Not a code block
}

// Function to check if the message contains HTML tags
function containsHTML(str: string): boolean {
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i; // A simple regex to detect HTML tags
  return htmlTagRegex.test(str);
}

interface ChatItemProps {
  content: string;
  role: "user" | "assistant";
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const messageBlocks = extractCodeFromString(content); // Extract code blocks from the message
  const auth = useAuth(); // Get user data

  // Check if the content contains HTML
  const hasHTML = containsHTML(content);

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        {/* Render the message, checking for code blocks or HTML */}
        {messageBlocks.length === 0 ? (
          hasHTML ? (
            <Typography
              sx={{
                fontSize: "20px",
                whiteSpace: "pre-line", // Ensures line breaks are respected
                marginBottom: "10px", // Adds spacing after each sentence
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: "20px",
                whiteSpace: "pre-line", // Ensures line breaks are respected
                marginBottom: "10px", // Adds spacing after each sentence
              }}
            >
              {content}
            </Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : hasHTML ? (
              <Typography
                key={index}
                sx={{
                  fontSize: "20px",
                  whiteSpace: "pre-line", // Ensures line breaks are respected
                  marginBottom: "10px", // Adds spacing after each sentence
                }}
                dangerouslySetInnerHTML={{ __html: block }}
              />
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "20px",
                  whiteSpace: "pre-line", // Ensures line breaks are respected
                  marginBottom: "10px", // Adds spacing after each sentence
                }}
              >
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {/* Render the message, checking for code blocks or HTML */}
        {messageBlocks.length === 0 ? (
          hasHTML ? (
            <Typography
              sx={{
                fontSize: "20px",
                whiteSpace: "pre-line", // Ensures line breaks are respected
                marginBottom: "10px", // Adds spacing after each sentence
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: "20px",
                whiteSpace: "pre-line", // Ensures line breaks are respected
                marginBottom: "10px", // Adds spacing after each sentence
              }}
            >
              {content}
            </Typography>
          )
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : hasHTML ? (
              <Typography
                key={index}
                sx={{
                  fontSize: "20px",
                  whiteSpace: "pre-line", // Ensures line breaks are respected
                  marginBottom: "10px", // Adds spacing after each sentence
                }}
                dangerouslySetInnerHTML={{ __html: block }}
              />
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "20px",
                  whiteSpace: "pre-line", // Ensures line breaks are respected
                  marginBottom: "10px", // Adds spacing after each sentence
                }}
              >
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  );
};

export default ChatItem;
