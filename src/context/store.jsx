import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}

export function AppContextProvider({ children }) {
  // refs
  const cameraControlsRef = useRef();
  const [defaultCameraPosition, setDefaultCameraPosition] = useState([
    0.1, 0.1, 8,
  ]);
  const [allRotatingCubes, setAllRotatingCubes] = useState(true);

  // states
  const [currentProject, setCurrentProject] = useState(null);

  // effects

  // functions
  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);

    setCurrentProject(null);
  };

  const contextValues = {
    cameraControlsRef,
    resetCamera,
    defaultCameraPosition,
    setDefaultCameraPosition,
    allRotatingCubes,
    setAllRotatingCubes,
    currentProject,
    setCurrentProject,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
