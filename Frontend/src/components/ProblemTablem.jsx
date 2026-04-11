import React from 'react'
import { useState, useMemo } from 'react'
import { useAuthStore } from "../store/useAuthStrore.js"
import { Link } from "react-router-dom"
import { Bookmark, PencilIcon, Trash, TrashIcon, Plus } from 'lucide-react'

const ProblemTablem = ({ problems }) => {

    const { authUser } = useAuthStore();

    const [ search, setSearch ] = useState("");
    const [ difficulty, setDifficulty ] = useState("ALL");
    const [ selectedTag, setSelectedTag ] = useState("ALL");
    const [ currenctPage, setCurrenctPage ] = useState(1);

    const difficulties = ["EASY", "MEDIUM", "HARD"];

    const handleDelete = (id) => {

    }

    const handleAddToPlaylist = (id) => {}

    const allTags = useMemo(() => {
        
      if (!Array.isArray(problems)) return [];

      const tagsSet = new Set();
        problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
        return Array.from(tagsSet);
      }, [problems]);


      const filteredProblems = useMemo(() => {
        return (problems || [])
          .filter((problem) => problem.title.toLowerCase().includes(search.toLocaleLowerCase()))
          .filter((problem) => difficulty === "ALL" ? true : problem.difficulty === difficulty)
          .filter((problem) => selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag))

      }, [problems, search, difficulty, selectedTag])

  
  const itemsPerpage = 5;
  console.log("itemsPerpage", itemsPerpage);
  
  const totalPages = Math.ceil(filteredProblems.length / itemsPerpage)
  console.log("totalPages", totalPages);
  
  
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currenctPage - 1) * itemsPerpage,
      currenctPage * itemsPerpage
    );
  }, [filteredProblems, currenctPage]);

  console.log("paginatedProblems", paginatedProblems );
  



  return (
    <div className="w-full max-w-6xl mx-auto mt-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered bg-base-200"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        
        <select
          className="select select-bordered bg-base-200"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="table table-zebra table-lg bg-base-200 text-base-content">

              <thead className="bg-base-200">
                  <th>Solved</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
              </thead>

              <tbody>
                  {
                    paginatedProblems.length > 0 ? (
                      paginatedProblems.map((problem) => {

                        const isSolved = problem.solvedBy?.some(
                          (user) => user.userId?.toString() === authUser?._id?.toString()
                        );                        


                        console.log("isSolved", isSolved);
                        console.log("solvedBy array:", problem.solvedBy);

                        console.log("problem", problem);
                        console.log("authUser", authUser?.id);
                        // console.log("authUser-Id",authUser?._id);
                        // console.log("authUser", user.userId?.toString());
                        
                        console.log("paginatedProblems", paginatedProblems);
                        console.log("paginatedProblems.length", paginatedProblems.length);
                        
                        
                        return (
                          <tr key={problem.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={isSolved}
                                readOnly
                                className="checkbox checkbox-sm"
                              />
                            </td>
                            <td>
                              <Link to={`/problem/${problem.id}`} className="font-semibold hover:underline">
                                {problem.title}
                              </Link>
                            </td>
                            <td>
                              <div className="flex flex-wrap gap-1">
                                {(problem.tags || []).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="badge badge-outline badge-warning text-xs font-bold"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span
                                className={`badge font-semibold text-xs text-white ${
                                  problem.difficulty === "EASY"
                                    ? "badge-success"
                                    : problem.difficulty === "MEDIUM"
                                    ? "badge-warning"
                                    : "badge-error"
                                }`}
                              >
                                {problem.difficulty}
                              </span>
                            </td>
                            <td>
                              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                                {authUser?.role === "admin" && (
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleDelete(problem.id)}
                                      className="btn btn-sm btn-error"
                                    >
                                      <TrashIcon className="w-4 h-4 text-white" />
                                    </button>
                                    <button disabled className="btn btn-sm btn-warning">
                                      <PencilIcon className="w-4 h-4 text-white" />
                                    </button>
                                  </div>
                                )}
                                <button
                                  className="btn btn-sm btn-outline flex gap-2 items-center"
                                  onClick={() => handleAddToPlaylist(problem.id)}
                                >
                                  <Bookmark className="w-4 h-4" />
                                  <span className="hidden sm:inline">Save to Playlist</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td caLSpan={5} className="text-center py-6 text-gray-600">
                          No Problem Found.
                        </td>
                      </tr>
                    )
                  }
              </tbody>
          </table>
      </div>

      {/*  */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={currenctPage === 1}
          onClick={() => setCurrenctPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm">
            {currenctPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currenctPage === totalPages}
          onClick={() => setCurrenctPage((prev) => prev + 1)}
        >
          Next
        </button>
        
      </div>


    </div>
  )
}

export default ProblemTablem