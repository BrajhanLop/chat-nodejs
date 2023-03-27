import { FileManager } from "../FileManager.js";

const manager = new FileManager("./database/mensajes.json");

export const getMesages = async (req, res) => {
    try {
      const mensajes = await manager.buscarCosas();
  
      res.json({
        status: true,
        data: { mensajes },
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const guardarMesages = async (req, res) => {
    try {
        const {autor, mensaje } = req.body
        
      const newMessage = await manager.guardarCosa({autor, mensaje});
      res.json({
        status: true,
        data: newMessage
      });
    } catch (error) {
      console.log(error);
    }
  };