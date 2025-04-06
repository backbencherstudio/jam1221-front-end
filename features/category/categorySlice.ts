import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export type Category = {
  id: string
  name: string
  description: string
  icon: string
  questionCount: number
}

// Initial dummy data
const initialData: Category[] = [

  {
    id: "1",
    name: "Theory Quiz",
    description: "Theory Quiz questions",
    questionCount: 40,
    icon: "🧠",
  },
  {
    id: "2",
    name: "CONCEPT",
    description: "Basic concepts and theory questions",
    questionCount: 10,
    icon: "📚",
  },
  {
    id: "3",
    name: "TRAFFIC SAFETY",
    description: "Questions about traffic safety measures",
    questionCount: 10,
    icon: "🚧",
  },
  {
    id: "4",
    name: "TRAFFIC RULES",
    description: "Questions about traffic rules and regulations",
    questionCount: 10,
    icon: "🚦",
  },
  {
    id: "5",
    name: "ENVIRONMENT",
    description: "Questions about environmental impact and regulations",
    questionCount: 10,
    icon: "🌍",
  },
]


// Slice
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: initialData,
    loading: false,
  },
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, "id" | "questionCount">>) => {
      const newCategory = {
        ...action.payload,
        id: crypto.randomUUID(),
        questionCount: 0,
      }
      state.categories.push(newCategory)
    },
    updateCategory: (state, action: PayloadAction<{ id: string; data: Omit<Category, "id" | "questionCount"> }>) => {
      const { id, data } = action.payload
      const index = state.categories.findIndex((cat) => cat.id === id)
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...data,
        }
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload)
    },
  },
})

export const { addCategory, updateCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer
