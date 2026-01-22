import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "COMPLETED" | "On Hold";
  createdAt: string;
  deletedAt?: string | null;
  createdBy: string; // user id
}

interface ProjectsState {
  list: Project[];
  isLoading: boolean;
}

const initialState: ProjectsState = {
  list: [
    {
      id: "1",
      name: "Website Redesign",
      description: "Redesigning the corporate website.",
      status: "ACTIVE",
      createdAt: "2023-01-10",
      createdBy: "1",
      deletedAt: null,
    },
    {
      id: "2",
      name: "Mobile App",
      description: "MVP for the mobile app.",
      status: "On Hold",
      createdAt: "2023-02-20",
      createdBy: "2",
      deletedAt: null,
    },
  ],
  isLoading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload);
    },
    updateProject: (
      state,
      action: PayloadAction<Partial<Project> & { id: string }>,
    ) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      // Soft delete
      const index = state.list.findIndex((p) => p.id === action.payload);
      if (index !== -1) {
        state.list[index].deletedAt = new Date().toISOString();
      }
    },
  },
});

export const { addProject, updateProject, deleteProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
