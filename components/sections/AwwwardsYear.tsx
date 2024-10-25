"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
    year: string;
    name: string;
    category: string;
    image: string;
}

const projects: Project[] = [
    {
        year: "2023",
        name: "Project Alpha",
        category: "Web Design",
        image: "/images/image1.jpg",
    },
    {
        year: "2022",
        name: "Project Beta",
        category: "UX/UI",
        image: "/images/image2.jpg",
    },
    {
        year: "2021",
        name: "Project Gamma",
        category: "Branding",
        image: "/images/image3.jpg",
    },
    {
        year: "2020",
        name: "Project Delta",
        category: "Mobile App",
        image: "/images/image4.jpg",
    },
    {
        year: "2019",
        name: "Project Epsilon",
        category: "E-commerce",
        image: "/images/image5.jpg",
    },
];

const AwwwardsYear: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLeftHalf, setIsLeftHalf] = useState(true);
    const tableRef = useRef<HTMLTableElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLTableElement>) => {
        if (tableRef.current) {
            const rect = tableRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const isLeft = x < rect.width / 2;
            setIsLeftHalf(isLeft);
            setMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <motion.table
                className="w-full"
                ref={tableRef}
                onMouseMove={handleMouseMove}
                variants={tableVariants}
                initial="hidden"
                animate="visible"
            >
                <thead>
                <motion.tr variants={rowVariants} className="text-left text-gray-600 border-b-2 border-gray-200">
                    <th className="py-6 font-normal text-sm">Year</th>
                    <th className="py-6 font-normal text-sm"></th>
                    <th className="py-6 font-normal text-sm">Category</th>
                    <th className="py-6 font-normal text-sm"></th>
                </motion.tr>
                </thead>
                <tbody>
                {projects.map((project, index) => (
                    <motion.tr
                        key={index}
                        variants={rowVariants}
                        className="relative border-b border-gray-200 transition-colors hover:border-orange-500"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <td className="py-8 text-gray-800">{project.year}</td>
                        <td className="py-8 font-medium text-black">{project.name}</td>
                        <td className="py-8 text-gray-600">{project.category}</td>
                        <td className="py-8">
                            <Image
                                src={"/svgs/arrowRight.svg"}
                                alt={"SVG Arrow Right"}
                                width={20}
                                height={20}
                                style={{ objectFit: "cover" }}
                            />
                        </td>

                    </motion.tr>
                ))}
                </tbody>
            </motion.table>
            <motion.div
                className="fixed top-0 pointer-events-none w-60 h-40 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredIndex !== null ? 1 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.8,
                    x: isLeftHalf ? mousePosition.x + 20 : mousePosition.x - 600,
                    y: mousePosition.y - 80,
                }}
                transition={{ duration: 0.2 }}
            >
                {hoveredIndex !== null && (
                    <Image
                        src={projects[hoveredIndex].image}
                        alt={projects[hoveredIndex].name}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                )}
            </motion.div>
        </div>
    );
};

export default AwwwardsYear;