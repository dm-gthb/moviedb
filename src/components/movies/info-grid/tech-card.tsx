import { TechItems } from '../../../services/movies/movies.categorize.service';
import { Card, CardAnchor, CardSection } from './info-card';

export function TechCard({ items }: { items: TechItems }) {
  return (
    <Card>
      {items.map(({ title, content, href }) => (
        <CardSection key={title} title={title}>
          {href ? <CardAnchor>{content}</CardAnchor> : <span>{content}</span>}
        </CardSection>
      ))}
    </Card>
  );
}
