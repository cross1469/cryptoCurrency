import React from "react";
import ContentLoader from "react-content-loader";

const DashboardLoader = () => (
  <ContentLoader
    width="100%"
    height="205"
    viewBox="0 0 1200 205"
    backgroundColor="#687592"
    foregroundColor="#dbdbdb"
  >
    <rect x="0" y="37" rx="4" ry="3" width="298" height="129" />
    <rect x="320" y="37" rx="4" ry="3" width="298" height="129" />
    <rect x="640" y="37" rx="4" ry="3" width="298" height="129" />
    <rect x="960" y="37" rx="4" ry="3" width="298" height="129" />
  </ContentLoader>
);

DashboardLoader.metadata = {
  name: "Sridhar Easwaran",
  github: "sridhareaswaran",
  description: "Dashboard pages",
  filename: "DashboardLoader",
};

export default DashboardLoader;
