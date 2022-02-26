// const { tb_profile } = require('../../models')

// exports.getProfile = async (req, res) => {
//     try {
//       const { id } = req.params;
  
//       const data = await tb_profile.findOne({
//         where: {
//           id,
//         },
//         include: {
//           model: tb_profile,
//           as: "profile",
//           attributes: {
//             exclude: ["createdAt", "updatedAt", "idUser"],
//           },
//         },
//         attributes: {
//           exclude: ["password", "createdAt", "updatedAt"],
//         },
//       });
  
//       res.send({
//         status: "success",
//         data: {
//           user: data,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//       res.send({
//         status: "failed",
//         message: "Server Error",
//       });
//     }
//   };