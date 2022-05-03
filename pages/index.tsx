/* eslint-disable react/function-component-definition */
import type { NextPage } from 'next';
import React from 'react';
import showdown from 'showdown';
import parse from 'html-react-parser';
import NavigationBar from './components/navbar/NavigationBar';
import getMarkdownContents from '../content/markdown-utils';

export async function getStaticProps() {
  const aboutMarkdownPath = `${process.cwd()}/content/about.md`;
  const aboutMarkdown = getMarkdownContents(aboutMarkdownPath);

  const aboutHtml = new showdown.Converter().makeHtml(aboutMarkdown);

  if (!aboutHtml) {
    throw new Error(`Could not get markdown at ${aboutMarkdownPath}`);
  }

  return {
    props: {
      aboutHtml,
    },
  };
}

interface AboutPageProps {
  aboutHtml: string;
}

const Home: NextPage = ({ aboutHtml }: AboutPageProps) => (
  <>
    <div>
      <NavigationBar />
    </div>
    <div>{parse(aboutHtml)}</div>
  </>
);
export default Home;
