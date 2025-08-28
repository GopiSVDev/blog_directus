import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLoaderData } from "react-router";

const Navbar = () => {
  const { loggedIn } = useLoaderData();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

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
    <Box pb={20}>
      <header
        style={{
          height: "60px",
          paddingInline: "16px",
          borderBottom: "1px solid black",
        }}
      >
        <Group justify="space-between" h="100%">
          <Title order={2}>Blog App</Title>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/">Home</Link>
          </Group>

          <Group visibleFrom="sm">
            {navLinks.map((link) => (
              <Link to={link.to} key={link.label}>
                <Button variant="default">{link.label}</Button>
              </Link>
            ))}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Link to="/">Home</Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {navLinks.map((link) => (
              <Link to={link.to} key={link.label}>
                <Button variant="default">{link.label}</Button>
              </Link>
            ))}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
