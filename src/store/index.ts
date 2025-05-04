import { create } from "zustand";
import { Student } from "../interfaces/Student";

type State = {
  student: Student | null;
};

type Action = {
  setStudent: (student: Student) => void;
};

const studentStore = create<State & Action>((set) => ({
  student: null,
  setStudent: (student: Student) => set(() => ({ student })),
}));

export default studentStore;
