import React, { Suspense, useEffect } from "react";
import routes from "../../shared/routes/AdminRoutes";
import { Routes, Navigate, Route } from "react-router-dom";
import { selectUser } from "../../app/slices/AuthSlice";
import { useSelector } from "react-redux";

const SidebarRoutes = () => {
  const loggedUser = useSelector(selectUser);

  return (
    <>
      <Suspense
        fallback={
          <>
            <h2>Loading....</h2>
          </>
        }
      >
        <Routes>
          {Array.isArray(routes) &&
            routes
              .filter((route) => route.roles.includes(loggedUser.role))
              .map(({ path, hasSubRoutes, component }, i) => (
                <>
                  <Route
                    path={hasSubRoutes ? `${path}/*` : path}
                    element={component}
                  />
                  <Route path="" element={<Navigate to={path} />} />
                </>
              ))}
        </Routes>
      </Suspense>
    </>
  );
};

export default SidebarRoutes;
