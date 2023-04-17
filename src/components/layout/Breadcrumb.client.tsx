import { Link } from "../../components/Link.client";
import { FC } from "react";
import { Responsive } from "../Responsive.client";

interface Props {
  routes: {
    title: string;
    path: string;
  }[];
}

export const Breadcrumb: FC<Props> = (props) => (
  <Responsive
    desktop={DesktopBreadcrumb}
    mobile={MobileBreadcrumb}
    props={props}
  />
);

const DesktopBreadcrumb: FC<Props> = ({ routes }) => (
  <div className="wrapper flex mt-8">
    <BreadcrumbItem title="COCO PET HOME" path="/" />
    {routes.map((route, i) => (
      <BreadcrumbItem title={route.title} path={route.path} key={i} />
    ))}
  </div>
);

const MobileBreadcrumb: FC<Props> = ({ routes }) => (
  <div className="py-4 px-2 w-screen overflow-x-scroll">
    <div className="flex">
      <BreadcrumbItem title="COCO PET HOME" path="/" />
      {routes.map((route, i) => (
        <BreadcrumbItem title={route.title} path={route.path} key={i} />
      ))}
    </div>
  </div>
);

const BreadcrumbItem: FC<Props["routes"][number]> = ({ title, path }) => (
  <Link
    route="url"
    url={path}
    className="px-2 border-r border-solid border-gray last:border-r-0 inline"
  >
    <p className="text-xs text-gray whitespace-nowrap">{title}</p>
  </Link>
);
