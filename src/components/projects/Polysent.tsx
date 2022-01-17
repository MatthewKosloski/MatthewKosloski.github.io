import React from 'react';
import { Project, ButtonLink } from '../';
import { ButtonLinkVariant } from '../ButtonLink';
import polysentImgSrc from '../../images/polysent.jpg';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
  return <img src={polysentImgSrc} alt="Polysent" />;
}

function PolysentProject({ featureOnLeft = false }: BaseProjectProps) {
  return (
    <Project
      title="Polysent"
      subtitle="A Single Page Web Application"
      featuredComponent={<FeaturedComponent />}
      buttonPrimary={<ButtonLink href="#">Source Code</ButtonLink>}
      buttonSecondary={
        <ButtonLink variant={ButtonLinkVariant.SECONDARY} href="#">
          Live Demo
        </ButtonLink>
      }
      featureOnLeft={featureOnLeft}
    >
      <p>
        Polysent is a single page application that enables users to create,
        view, search for, and interact with public or private polls.
      </p>
      <p>
        It's built on the MEAN (MongoDB, ExpressJS, Angular, Node.js) tech stack
        and uses browser local storage to save the user's voting history. It's
        currently running in a Docker container on a Digital Ocean virtual
        private server (VPS).
      </p>
      <p>
        <em>This project is not actively maintained.</em>
      </p>
    </Project>
  );
}

export default PolysentProject;
