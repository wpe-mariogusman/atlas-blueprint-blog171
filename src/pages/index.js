import { getNextStaticProps } from '@faustjs/next';
import React from 'react';
import { client } from 'client';
import { FaArrowRight } from 'react-icons/fa';
import {
  Posts,
  Header,
  Footer,
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  Testimonials,
  SEO,
} from 'components';
import styles from 'styles/pages/_Home.module.scss';
import { pageTitle } from 'utils';

const postsPerPage = 3;

export default function Page() {
  const { useQuery, usePosts } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: postsPerPage,
    where: {
      categoryName: 'uncategorized',
    },
  });
  const testimonials = useQuery().testimonials();
  const mainBanner = {
    sourceUrl: '/static/8a1b0f77c92e288311660c96aad2d85b.webp',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Blog Banner',
  };

  return (
    <>
      <SEO
        title={pageTitle(generalSettings)}
        imageUrl={mainBanner?.sourceUrl}
      />

      <Header />

      <Main className={styles.home}>
        <EntryHeader image={mainBanner} />
        <div className="container">
          <section className="hero text-center">
            <Heading className={styles.heading} level="h1">
              hi this is mario
            </Heading>
            <p className={styles.description}>
              hi again this is mario but tiny font 👌 {' '}
            </p>
            <div className={styles.actions}>
              <Button styleType="secondary" href="/contact-us">
                GET STARTED
              </Button>
              <Button styleType="primary" href="/about">
                LEARN MORE
              </Button>
            </div>
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
          <section className={styles.posts}>
            <Heading className={styles.heading} level="h2">
              Latest Posts
            </Heading>
            <Posts posts={posts?.nodes} id="posts-list" />
          </section>
          <section className="cta">
            <CTA
              Button={() => (
                <Button href="/posts">
                  Get Started <FaArrowRight style={{ marginLeft: `1rem` }} />
                </Button>
              )}
            >
              <span>
                Learn about Core Web Vitals and how Atlas can help you reach
                your most demanding speed and user experience requirements.
              </span>
            </CTA>
          </section>
          <section className={styles.testimonials}>
            <Heading className={styles.heading} level="h2">
              Testimonials
            </Heading>
            <p className={styles.description}>
              Here are just a few of the nice things our customers have to say.
            </p>
            <Testimonials testimonials={testimonials?.nodes} />
          </section>
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
