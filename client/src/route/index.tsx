import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { PrivateLayout, PublicLayout } from "./module";
import ErrorPage from "../pages/error";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />} errorElement={<ErrorPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route element={<PrivateLayout />} errorElement={<ErrorPage />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </>
  )
)