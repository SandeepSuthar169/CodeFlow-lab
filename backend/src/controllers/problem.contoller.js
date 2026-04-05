import { Problem } from "../models/problem.models.js";
import { DifficultyEnum, AvailableDifficulty } from "../utils/constants.js";

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolutions,
    } = req.body;

    // Required field check
    if (!title || !description || !examples || !testcases || !codeSnippets || !referenceSolutions) {
      return res.status(400).json({
        success: false,
        message: "title, description, examples, testcases, codeSnippets, and referenceSolutions are required.",
      });
    }

    // Normalize difficulty to uppercase before validating
const normalizedDifficulty = difficulty?.toUpperCase()
    // Validate difficulty
    if (normalizedDifficulty && !AvailableDifficulty.includes(normalizedDifficulty)) {
      return res.status(400).json({
        success: false,
        message: `Invalid difficulty. Must be one of: ${AvailableDifficulty.join(", ")}`,
      });
    }

    // examples is an object keyed by language — not an array
    if (typeof examples !== "object" || Array.isArray(examples)) {
      return res.status(400).json({
        success: false,
        message: "examples must be an object keyed by language (e.g. { JAVASCRIPT: {...}, PYTHON: {...} })",
      });
    }

    // Normalize constraints: accept both string and array
    const normalizedConstraints = Array.isArray(constraints)
      ? constraints
      : typeof constraints === "string"
      ? [constraints]
      : [];

    const problem = await Problem.create({
      title,
      description,
      difficulty: normalizedDifficulty ?? DifficultyEnum.EASY,  // ✅ use normalized
      tags: tags ?? [],
      examples,
      constraints: normalizedConstraints,
      hints,
      editorial,
      testcases,
      codeSnippets,
      referenceSolution: referenceSolutions,  // map plural → singular schema field
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Problem created successfully.",
      data: problem,
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A problem with this title already exists.",
      });
    }
    console.error("createProblem error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export { createProblem };