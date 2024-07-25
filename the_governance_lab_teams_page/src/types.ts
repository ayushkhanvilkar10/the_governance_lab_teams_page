export interface Location {
    loc: string;
}

export interface MoreAbout {
    title: string;
    link: string;
}

export interface Gallery2020 {
    picture: string;
}

export interface ProjectID {
    background: string;
    created_on: string;
    description: string;
    description_full: string;
    id: number;
    maintag: string;
    name: string;
    order: number | null;
    owner: string;
    past: string | null;
    progress: string;
    project_link: string;
    results: string;
    slug: string;
    status: string;
    subtag: string;
    main_picture_2020: string;
    picture: string;
    location: Location[];
    partners: any[];
    more_about: MoreAbout[];
    gallery_2020: Gallery2020[];
    governance_area: string[];
    innovative_capability: string[];
    product_category: string[];
    institution_type: string[];
    project_team: number[];
    gallery: any[];
}

export interface Project {
    id: number;
    team_id: string;
    projects_id: ProjectID;
}

// src/types.ts
export interface TeamMember {
    name: string;
    title?: string;  // Optional property for the title
    bio_short?: string;  // Optional property for short biography
    picture_blog2020?: string;  // Optional property for the picture URL
    [key: string]: any;
}
