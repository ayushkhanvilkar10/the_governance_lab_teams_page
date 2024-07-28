export interface ProjectID {
    id: number;
    name: string;
    project_link: string;
}

export interface Project {
    id: number;
    team_id: string;
    projects_id: ProjectID;
}

export interface Picture {
    id: string;
}

export interface TeamMember {
    name: string;
    title?: string;
    bio_short?: string;
    bio?: string;
    picture_blog2020?: string;
    picture?: Picture;
    projects?: Project[];
    [key: string]: any;
}
