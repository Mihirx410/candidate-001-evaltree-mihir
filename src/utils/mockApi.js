export const mockApi = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/api/createCollectible") {
          resolve({
            status: 200,
            message: "Collectible created successfully!",
            data: {
              id: Math.floor(Math.random() * 100000),
              ...data,
            },
          });
        } else {
          reject({ status: 404, message: "Endpoint not found" });
        }
      }, 1200);
    });
  },
  // You can add more mock endpoints here as needed
}; 