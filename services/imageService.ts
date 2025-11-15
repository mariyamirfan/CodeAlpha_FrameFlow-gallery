import { GoogleGenAI, Type } from "@google/genai";
import { Image } from '../types';
import { IMAGES_PER_PAGE } from '../constants';

const authors = [
  "John Doe", "Jane Smith", "Alex Johnson", "Emily Brown", "Chris Lee", "Patricia Williams",
  "Michael Jones", "Linda Garcia", "David Miller", "Sarah Davis", "James Rodriguez", "Maria Martinez"
];

// Simple hashing function to get a consistent number from a string
const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const generateImageData = async (query: string, page: number): Promise<{ title: string; keywords: string }[]> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a list of ${IMAGES_PER_PAGE} diverse and specific photo ideas for a gallery about '${query}'. For each idea, provide a short, creative title (3-6 words) and 1-2 specific, comma-separated keywords to find a matching image. This is for page ${page} so the ideas should be unique. Example for 'Mountains': title "Himalayan Sunrise", keywords "Himalayas, sunrise".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        images: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: {
                                        type: Type.STRING,
                                        description: "A creative and descriptive title for an image (3-6 words)."
                                    },
                                    keywords: {
                                        type: Type.STRING,
                                        description: "1-2 comma-separated keywords for finding a specific image."
                                    }
                                },
                                required: ["title", "keywords"]
                            },
                            description: `An array of ${IMAGES_PER_PAGE} image objects.`
                        }
                    },
                    required: ["images"]
                }
            }
        });

        const jsonResponse = JSON.parse(response.text);
        if (jsonResponse.images && Array.isArray(jsonResponse.images) && jsonResponse.images.length > 0) {
            let imageData = jsonResponse.images;
            // Ensure we return exactly IMAGES_PER_PAGE items
            while (imageData.length < IMAGES_PER_PAGE) {
                imageData.push(...jsonResponse.images.slice(0, IMAGES_PER_PAGE - imageData.length));
            }
            return imageData.slice(0, IMAGES_PER_PAGE);
        }
        console.warn("Gemini response was not as expected, using fallback data.");
        return Array.from({ length: IMAGES_PER_PAGE }, (_, i) => ({
            title: `${query} Photo #${page * IMAGES_PER_PAGE + i + 1}`,
            keywords: query
        }));
    } catch (error) {
        console.error("Error generating image data with Gemini:", error);
        // Fallback in case of API error
        return Array.from({ length: IMAGES_PER_PAGE }, (_, i) => ({
            title: `${query} Photo #${page * IMAGES_PER_PAGE + i + 1}`,
            keywords: query
        }));
    }
};


export const fetchImages = async (
  query: string,
  page: number
): Promise<Image[]> => {
  const effectiveQuery = query.toLowerCase() === 'all' ? 'breathtaking photography' : query;
  
  const imageData = await generateImageData(effectiveQuery, page);
  
  const images: Image[] = [];

  for (let i = 0; i < imageData.length; i++) {
    const item = imageData[i];
    const uniqueId = page * IMAGES_PER_PAGE + i;
    // Use a combination of keywords and unique ID for a more varied seed
    const seed = `${item.keywords.split(',')[0].trim()}${uniqueId}`;
    const authorIndex = simpleHash(seed) % authors.length;

    // Use the seed with picsum.photos for guaranteed image loading
    const imageUrl = `https://picsum.photos/seed/${seed}/800/600`;

    images.push({
      id: `img-${seed}-${i}`,
      url: imageUrl,
      alt: item.title, // Use the AI-generated title for perfect context
      author: authors[authorIndex]
    });
  }
  return images;
};