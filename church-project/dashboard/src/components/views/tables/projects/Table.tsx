import { useState } from "react";
import ModernTable from "@/components/ui/Table/Index";
import type { Column, ActionButton } from "@/components/ui/Table/Index";
import Pagination from "@/components/ui/Pagination/Index";
import type { ProjectTableData } from "@/components/interface/Projects";
import AddEditProjects from "../../model/projects/Modal";

const ProjectTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectTableData | null>(null);

  const [projects, setProjects] = useState<ProjectTableData[]>([
    {
      id: 1,
      name: "Church Renovation",
      description: "Renovating main church hall",
      setAmount: 100000,
      receivedAmount: 60000,
      active: true,
      createdAt: "2025-05-20",
    },
    {
      id: 2,
      name: "Youth Outreach",
      description: "Organizing youth rows and outreach",
      setAmount: 50000,
      receivedAmount: 20000,
      active: false,
      createdAt: "2025-05-22",
    },
  ]);

  const handleEdit = (project: ProjectTableData) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const columns: Column<ProjectTableData>[] = [
    { key: "name", label: "Project Name" },
    { key: "description", label: "Description" },
    { key: "setAmount", label: "Set Amount" },
    { key: "receivedAmount", label: "Received Amount" },

    {
      key: "active",
      label: "Active",
      render: (row) => (
        <span
          style={{
            padding: "4px 10px",
            borderRadius: 15,
            backgroundColor:
              row.active === true ? "var(--positive)" : "var(--negative",
            color: "var(--primarywhite)",
            fontWeight: 600,
            fontSize: "12px",
            userSelect: "none",
          }}
        >
          {row.active ? "Yes" : "No"}
        </span>
      ),
    },
    { key: "createdAt", label: "Created At" },
  ];

  const actions: ActionButton<ProjectTableData>[] = [
    {
      type: "update",
      onClick: handleEdit,
    },
    {
      type: "delete",
      onClick: (project) =>
        setProjects((prev) => prev.filter((p) => p.id !== project.id)),
    },
    {
      type: "toggle",
      onClick: (event) =>
        setProjects((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, active: !e.active } : e))
        ),
    },
  ];

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    // Add pagination logic here if needed
  };

  return (
    <div>
      <ModernTable
        columns={columns}
        data={projects}
        actions={actions}
        keyField="id"
      />
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
      <AddEditProjects
        open={openModal}
        close={handleClose}
        data={selectedProject}
      />
    </div>
  );
};

export default ProjectTable;
