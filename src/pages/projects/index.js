import { useEffect, useState } from "react";
import { axiosAiClient } from "@/axiosClient";
import MainLayout from "@/components/layout/MainLayout";
import withLoggedIn from "@/guards/withLoggedIn";
import Link from "next/link";

export const getServerSideProps = withLoggedIn(async (context) => {
    return { props: {} };
});

export default function AllProjects() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [filter, setFilter] = useState({
        theme: "",
        domain: "",
        category: "",
    });

    useEffect(() => {
        axiosAiClient.get("/api/allprojects").then((response) => {
            setProjects(response.data);
            setFilteredProjects(response.data);
        });
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter({ ...filter, [name]: value });
    };

    useEffect(() => {
        // Filter projects based on selected filter options
        let filtered = projects;
        if (filter.theme) {
            filtered = filtered.filter((project) =>
                project.theme.toLowerCase().includes(filter.theme.toLowerCase())
            );
        }
        if (filter.domain) {
            filtered = filtered.filter((project) =>
                project.domain.toLowerCase().includes(filter.domain.toLowerCase())
            );
        }
        if (filter.category) {
            filtered = filtered.filter((project) =>
                project.categories.includes(filter.category)
            );
        }
        setFilteredProjects(filtered);
    }, [filter, projects]);

    return (
        <MainLayout title="All Projects">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-semibold mb-8">All Projects</h1>

                {/* Filter Bar */}
                <div className="flex space-x-4 mb-4">
                <select name="theme" onChange={handleFilterChange} value={filter.theme} className="form-select">
  <option value="">Select Theme</option>
  {
    Array.from(
      new Set(
        projects.map(project => 
          project.theme.charAt(0).toUpperCase() + project.theme.slice(1).toLowerCase()
        )
      )
    ).map((theme, index) => (
      <option key={index} value={theme}>{theme}</option>
    ))
  }
</select>

                    <select
                        name="domain"
                        onChange={handleFilterChange}
                        value={filter.domain}
                        className="form-select"
                    >
                        <option value="">Select Domain</option>
                        {/* Add domain options dynamically based on available domains */}
                        {Array.from(
                            new Set(projects.map((project) => project.domain))
                        ).map((domain, index) => (
                            <option key={index} value={domain}>
                                {domain}
                            </option>
                        ))}
                    </select>

                    <select
                        name="category"
                        onChange={handleFilterChange}
                        value={filter.category}
                        className="form-select"
                    >
                        <option value="">Select Category</option>
                        {/* Add category options dynamically based on available categories */}
                        {Array.from(
                            new Set(
                                projects.flatMap(
                                    (project) => project.categories
                                )
                            )
                        ).map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid p-4 bg-white rounded-lg shadow-md mb-4"
                        >
                 {/* Project details as before */}
<h2 className="text-lg font-bold mb-2">{project.title}</h2>
<p className="text-gray-700 text-sm mb-4">
    {project.description.length > 150
        ? project.description.substring(0, 150) + "..."
        : project.description}
</p>
<div className="text-gray-600 text-xs mb-4">
    Date Created: {new Date(project.date_created).toLocaleDateString()}
</div>
<div className="mb-4">
    <strong className="font-bold">Categories:</strong>
    <ul className="list-disc list-inside">
        {project.categories.map((category, catIndex) => (
            <li key={catIndex} className="text-gray-600 text-sm">
                {category}
            </li>
        ))}
    </ul>
</div>

<Link
    href={`/projects/${project.id}`}
    className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
>
    View
</Link>
</div>
))}
</div>
</div>
</MainLayout>
);
}
           