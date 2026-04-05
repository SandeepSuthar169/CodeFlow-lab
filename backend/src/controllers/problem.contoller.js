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


// GET /api/v1/problems/:id
const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id).populate("user", "name email");

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully.",
      data: problem,
    });

  } catch (error) {
    console.error("getProblemById error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// GET /api/v1/problems
const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select(
      "title difficulty tags constraints hints editorial createdAt"
    );

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully.",
      count: problems.length,
      data: problems,
    });

  } catch (error) {
    console.error("getAllProblems error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// PUT /api/v1/problems/:id
const updateProblem = async (req, res) => {
  try {
    const { id } = req.params;

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

    // Check problem exists
    const existingProblem = await Problem.findById(id);

    if (!existingProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found.",
      });
    }

    // Normalize difficulty if provided
    const normalizedDifficulty = difficulty?.toUpperCase();  // match your constants case

    if (normalizedDifficulty && !AvailableDifficulty.includes(normalizedDifficulty)) {
      return res.status(400).json({
        success: false,
        message: `Invalid difficulty. Must be one of: ${AvailableDifficulty.join(", ")}`,
      });
    }

    // Normalize constraints if provided
    const normalizedConstraints = constraints
      ? Array.isArray(constraints)
        ? constraints
        : typeof constraints === "string"
        ? [constraints]
        : existingProblem.constraints
      : existingProblem.constraints;

    // Validate examples shape if provided
    if (examples && (typeof examples !== "object" || Array.isArray(examples))) {
      return res.status(400).json({
        success: false,
        message: "examples must be an object keyed by language.",
      });
    }

const updatedProblem = await Problem.findByIdAndUpdate(
    id,
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(normalizedDifficulty && { difficulty: normalizedDifficulty }),
          ...(tags && { tags }),
          ...(examples && { examples }),
          ...(constraints && { constraints: normalizedConstraints }),
          ...(hints && { hints }),
          ...(editorial && { editorial }),
          ...(testcases && { testcases }),
          ...(codeSnippets && { codeSnippets }),
          ...(referenceSolutions && { referenceSolution: referenceSolutions }),
        },
      },
      { new: true }   // return updated document
    );

  return res.status(200).json({
    success: true,
    message: "Problem updated successfully.",
    data: updatedProblem,
  });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A problem with this title already exists.",
      });
    }
    console.error("updateProblem error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



// DELETE /api/v1/problems/:id
const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found.",
      });
    }

    await Problem.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully.",
    });

  } catch (error) {
    console.error("deleteProblem error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// GET /api/v1/problems/solved   — all problems solved by the logged-in user
const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const solvedProblems = await Problem.find({
      solvedBy: userId,      // matches solvedBy ref in your schema
    }).select("title difficulty tags createdAt");  // return only useful fields

    return res.status(200).json({
      success: true,
      message: "Solved problems fetched successfully.",
      count: solvedProblems.length,
      data: solvedProblems,
    });

  } catch (error) {
    console.error("getAllProblemsSolvedByUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export { 
  createProblem,
  getProblemById,
  getAllProblems,
  updateProblem,
  deleteProblem,
  getAllProblemsSolvedByUser,
};

