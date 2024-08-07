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
  const [canMoveCamera, setCanMoveCamera] = useState(false);

  // effects

  // functions
  const resetCamera = () => {
    cameraControlsRef.current?.reset(true);
    setCurrentProject(null);
  };

  const outOfFocus = () => {
    setAllRotatingCubes(true);
    resetCamera();
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
    outOfFocus,
    canMoveCamera,
    setCanMoveCamera,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
