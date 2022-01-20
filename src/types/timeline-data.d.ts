type TimelineData = TimelineDatum[]

interface TimelineDatum {
    title: string;
    subtitle: string;
    description: string;
    date: {
        from: string;
        to?: string;
    }
}