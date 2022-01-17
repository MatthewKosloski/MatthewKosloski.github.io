import React from 'react';
import experienceYaml from '../../content/experiences.yml';
import { Timeline } from '.';

interface ExperienceTimelineProps {
    limit?: number;
}

function ExperienceTimeline({ limit = 0 }: ExperienceTimelineProps) {
    return (
        <Timeline dataSource={experienceYaml} limit={limit} />
    );
}

export default ExperienceTimeline;