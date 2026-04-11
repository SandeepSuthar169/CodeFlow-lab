import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { Editor } from '@monaco-editor/react'
import { useProblemStore } from '../store/useProblemstore'
import {
    Play,
    FileText,
    MessageSquare,
    Lightbulb,
    Bookmark,
    Share2,
    Clock,
    ChevronRight,
    BookOpen,
    Terminal,
    Code2,
    Users,
    ThumbsUp,
    Home,
  } from "lucide-react";



const ProblemPage = () => {
    const {id} = useParams()

    const { getProblemById, problem, isProblemLoading } = useProblemStore();
    
    useEffect(() => {
        getProblemById(id)
    }, [id])

    // console.log(problem);
    
    return (
    <div>
        hello {JSON.stringify(problem)}
    </div>
  )
}

export default ProblemPage