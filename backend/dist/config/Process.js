// Function to format Gemini response into structured content
export const processGeminiResponse = (message) => {
    // Replace markdown-like syntax with HTML for rendering
    let formattedMessage = message;
    // Headers
    formattedMessage = formattedMessage.replace(/^# (.*?)$/gm, "<h1>$1</h1>");
    formattedMessage = formattedMessage.replace(/^## (.*?)$/gm, "<h2>$1</h2>");
    formattedMessage = formattedMessage.replace(/^### (.*?)$/gm, "<h3>$1</h3>");
    // Bold text
    formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    // Italics
    formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, "<i>$1</i>");
    // Inline code (surrounded by backticks)
    formattedMessage = formattedMessage.replace(/`(.*?)`/g, "<code>$1</code>");
    // Block code (triple backticks) – you can wrap this in a preformatted block
    formattedMessage = formattedMessage.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
    return formattedMessage;
};
//# sourceMappingURL=Process.js.map