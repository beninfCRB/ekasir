import { HomeOutlined } from "@ant-design/icons";

export const generateBreadcrumbItems = (location: string) => {
  const pathSnippets = location.split('/').filter(i => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const title = index === 0 ? <HomeOutlined /> : pathSnippets[index];
    const cleanedTitle = typeof title === 'string' ? title.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, '') : title;

    return {
      title: cleanedTitle,
    };
  });

  return breadcrumbItems;
};