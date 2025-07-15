"use client"

import { createContext, useState, useContext, useCallback } from "react"

const SearchContext = createContext(null)

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value)
  }, [])

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm: handleSearchChange }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === null) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
