exports.handler = async (event) => {
  try {
    const rapidKey = process.env.RAPID_API_KEY;

    // Get URL from query string
    const { targetUrl } = event.queryStringParameters || {};

    if (!targetUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing targetUrl parameter" }),
      };
    }

    // Safety check: only allow ExerciseDB URLs
    const allowedBase = "https://exercisedb.p.rapidapi.com/";
    if (!targetUrl.startsWith(allowedBase)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid target URL" }),
      };
    }

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidKey,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    });

    const imageBase = "https://exercisedb.p.rapidapi.com/image";
    if (targetUrl.startsWith(imageBase)) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": response.headers.get("content-type"),
        },
        body: buffer.toString("base64"),
        isBase64Encoded: true,
      };
    } else {
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};