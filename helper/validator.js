import { body } from "express-validator"

export const validator = [
    body("name").not().isEmpty().withMessage("name can't be empty!"),
    body("lahan_kamar").not().isEmpty().withMessage("lahan_kamar can't be empty!"),
    body("lahan_parkiran").not().isEmpty().withMessage("lahan_parkiran can't be empty!"),
    body("lahan_spek").not().isEmpty().withMessage("lahan_spek can't be empty!"),
    body("kamar_parkiran").not().isEmpty().withMessage("kamar_parkiran can't be empty!"),
    body("kamar_spek").not().isEmpty().withMessage("kamar_spek can't be empty!"),
    body("parkiran_spek").not().isEmpty().withMessage("parkiran_spek can't be empty!"),
];