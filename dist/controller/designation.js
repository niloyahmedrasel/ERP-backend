"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationController = void 0;
const designation_1 = require("../service/designation");
const designationService = new designation_1.DesignationService();
class DesignationController {
    // Create a new designation
    createDesignation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            try {
                const designation = yield designationService.createDesignation(title, description);
                res.status(200).json({ data: designation });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating designation" });
            }
        });
    }
    // Get a designation by ID
    getDesignationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const designation = yield designationService.getDesignationById(id);
                if (!designation) {
                    res.status(404).json({ message: "Designation not found" });
                }
                else {
                    res.status(200).json({ data: designation });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching designation" });
            }
        });
    }
    // Get all designations
    getAllDesignations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const designations = yield designationService.getAllDesignations();
                res.status(200).json({ data: designations });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching designations" });
            }
        });
    }
    // Update a designation by ID
    updateDesignation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { title, description } = req.body;
            console.log(id);
            try {
                const updatedDesignation = yield designationService.updateDesignation(id, { title, description });
                if (!updatedDesignation) {
                    res.status(404).json({ message: "Designation not found" });
                }
                else {
                    res.status(200).json({ data: updatedDesignation });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error updating designation" });
            }
        });
    }
    // Delete a designation by ID
    deleteDesignation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const success = yield designationService.deleteDesignation(id);
                if (success) {
                    res.status(200).json({ message: "Designation deleted successfully" });
                }
                else {
                    res.status(404).json({ message: "Designation not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting designation" });
            }
        });
    }
    // Delete multiple designations based on filters
    deleteDesignations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filters = req.body; // Assuming filters are passed in the body as JSON
            try {
                const success = yield designationService.deleteDesignations(filters);
                if (success) {
                    res.status(200).json({ message: "Designations deleted successfully" });
                }
                else {
                    res.status(404).json({ message: "No designations found to delete" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting designations" });
            }
        });
    }
}
exports.DesignationController = DesignationController;
