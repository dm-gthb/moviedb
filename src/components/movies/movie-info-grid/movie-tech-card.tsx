import { TechItems } from '../../../services/movies/movies.categorize.service';
import { Card, CardAnchor, CardSection } from '../movie-info-card/movie-info-card';

export function MovieTechCard({ items }: { items: TechItems }) {
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
