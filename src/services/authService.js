import users from "../data/users.json";

// Simular una llamada a API con un pequeño retraso
export const authService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 500);
    });
  },
};

export default authService;
