"use client"

import { Suspense } from "react"
import OutputComponent from "../components/OutputComponent"


export default function Output() {
  return <Suspense fallback={<div>Loading...</div>}><OutputComponent/></Suspense>

}
