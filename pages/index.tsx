import type { InferGetStaticPropsType } from 'next'

import { createStyles, Title, Text, Container, Grid } from '@mantine/core'
import { ApplicationCard } from '../components/ApplicationCard'

import appsFile from '../apps.json'

export const getStaticProps = async () => {
  return {
    props: {
      apps: appsFile,
    },
  }
}

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120,
    paddingBottom: 80,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',
    marginBottom: '80px',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}))

function HeroText() {
  const { classes } = useStyles()

  return (
    <div className={classes.inner}>
      <Title className={classes.title}>
        The best{' '}
        <Text component="span" className={classes.highlight} inherit>
          Farcaster
        </Text>{' '}
        apps
      </Title>

      <Container p={0} size={600}>
        <Text size="lg" color="dimmed" className={classes.description}>
          Highlighting the best apps and builders on the Farcaster community.
        </Text>
      </Container>
    </div>
  )
}

const Home = ({ apps }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { classes } = useStyles()

  return (
    <Container className={classes.wrapper} size={1400}>
      <HeroText />
      <Grid>
        {apps.map(app => {
          return (
            <Grid.Col sm={6} md={4} key={app.name}>
              <ApplicationCard
                title={app.name}
                description={app.description}
                image={app.screenshots[0]}
                url={app.url}
              />
            </Grid.Col>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Home