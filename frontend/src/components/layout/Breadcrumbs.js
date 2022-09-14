import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = props => {
  const location= useLocation();
  const navigate= useNavigate();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter(x => x);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb" className='font-medium py-4 mb-6 xl:text-xl'>
      {pathnames.length > 0 ? (
        <Link onClick={() => navigate('/')}>Home</Link>
      ): (
        <Typography className='font-bold xl:text-xl'>Home</Typography>
      )}
      {pathnames.map((name, index) => {
        const RouteTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return index === pathnames.length - 1 ? (
          <Typography key={index} className='font-bold xl:text-xl'>{name}</Typography>
        ) : (
          <Link key={index} onClick={() => navigate(RouteTo)}>{name}</Link>
        )
      })}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
