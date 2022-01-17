import React from 'react';
import { Project, ButtonLink } from '../';
import { ButtonLinkVariant } from '../ButtonLink';
import torreyImgSrc from '../../images/torrey.jpg';
import { BaseProjectProps } from './types';

function FeaturedComponent() {
  return <img src={torreyImgSrc} alt="Torrey" />;
}

function TorreyProject({ featureOnLeft = false }: BaseProjectProps) {
  return (
    <Project
      title="Torrey"
      subtitle="A Compiler to x86-64 Assembly"
      featuredComponent={<FeaturedComponent />}
      buttonPrimary={<ButtonLink href="#">Source Code</ButtonLink>}
      buttonSecondary={
        <ButtonLink variant={ButtonLinkVariant.SECONDARY} href="#">
          Latest Release
        </ButtonLink>
      }
      featureOnLeft={featureOnLeft}
    >
      <p>
        Torrey is a Lisp-like programming language that type-checks at
        compile-time and compiles to 64-bit x86 assembly code.
      </p>
      <p>
        Releases are automated by a continuous integration (CI) pipeline which
        also compiles and tests the compiler and builds the runtime.
      </p>
      <p>
        Currently, I'm also working on building a playground environment that
        enables one to compile, link, and execute Torrey programs from the web
        browser.
      </p>
    </Project>
  );
}

export default TorreyProject;
