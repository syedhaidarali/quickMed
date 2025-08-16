/** @format */

import React from "react";
import { QuickHelpButton, QuickHelpModal } from "./index";

const QuickHelpLayout = ({ children }) => {
  return (
    <>
      {children}
      <QuickHelpButton />
      <QuickHelpModal />
    </>
  );
};

export default QuickHelpLayout;
