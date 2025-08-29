import { Anchor, Box, Container, Group } from "@mantine/core";

const Footer = () => {
  const links = [
    { link: "#", label: "Contact" },
    { link: "#", label: "Privacy" },
    { link: "#", label: "Blog" },
    { link: "#", label: "Store" },
    { link: "#", label: "Careers" },
  ];

  return (
    <Box mt="20px" style={{ borderTop: "1px solid black" }}>
      <Container maw="1440px">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Group>
            {links.map((link) => (
              <Anchor
                c="dimmed"
                key={link.label}
                href={link.link}
                lh={1}
                onClick={(event) => event.preventDefault()}
                size="sm"
              >
                {link.label}
              </Anchor>
            ))}
          </Group>
        </div>
      </Container>
    </Box>
  );
};

export default Footer;
