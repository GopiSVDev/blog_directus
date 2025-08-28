import { Link, Outlet, useLoaderData } from "react-router";
import { getUserSession } from "~/.server/session";
import type { Route } from "../+types/root";
import {
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Footer from "~/components/footer";

export async function loader({ request }: Route.LoaderArgs) {
  const { loggedIn } = await getUserSession(request);
  return { loggedIn };
}

const MainLayout = () => {
  const { loggedIn } = useLoaderData();
  const [opened, { toggle }] = useDisclosure();
  const navLinks = loggedIn
    ? [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Create", to: "/dashboard/create" },
        { label: "Logout", to: "/logout" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Signup", to: "/signup" },
      ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Container maw="1440px">
          <Group h="100%" py="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Title
                  order={3}
                  style={{
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                  }}
                >
                  Blog App
                </Title>
              </Link>

              <Group ml="xl" gap={0} visibleFrom="sm">
                <Link to="/">
                  <UnstyledButton
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      textAlign: "left",
                      padding: "8px 12px",
                    }}
                  >
                    Home
                  </UnstyledButton>
                </Link>
              </Group>
              <Group visibleFrom="sm">
                {navLinks.map((link) => (
                  <Link to={link.to} key={link.label}>
                    <Button variant="filled">{link.label}</Button>
                  </Link>
                ))}
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <Stack gap="sm">
          <UnstyledButton
            style={{
              fontWeight: 600,
              fontSize: 16,
              textAlign: "left",
              padding: "8px 12px",
            }}
          >
            Home
          </UnstyledButton>

          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.label}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="filled"
                fullWidth
                style={{ justifyContent: "flex-start" }}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container maw="1440px">
          <Outlet />
        </Container>
      </AppShell.Main>

      <Footer />
    </AppShell>
  );
};

export default MainLayout;
