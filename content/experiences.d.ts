type Experiences = Experience[]

interface Experience {
    title: string;
    subtitle: string;
    description: string;
    date: {
        from: string;
        to?: string;
    }
}