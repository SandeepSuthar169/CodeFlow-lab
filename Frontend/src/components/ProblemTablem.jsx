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

    const allTags = useMemo(() => {
        if (!Array.isArray(problems)) return [];
        const tagsSet = new Set();
        problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
        return Array.from(tagsSet);
      }, [problems]);


  return (
    <div className="w-full max-w-6xl mx-auto ">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Problems</h2>
            <button
                className="btn btn-primary gap-2"
                onClick={() => {}}
            >
                <Plus className="w-4 h-4" />
                Create Playlist
            </button>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <input 
                type="text"
                placeholder="Serch by title"
                className="input input-bordered w-full md:w-1/3 bg-base-200"
                value={search}
                onClick={(e) => setSearch(e.target.value)}
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
        </div>


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
  )
}

export default ProblemTablem