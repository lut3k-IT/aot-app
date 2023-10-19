import { cn } from '@/lib/utils';
import HeartButton from './HeartButton';

interface QuotationCardProps {
  className?: string;
}

const QuotationCard = (props: QuotationCardProps) => {
  const { className } = props;

  return (
    <div className={cn('w-full p-4 pr-12 border rounded-md relative', className)}>
      <div className={'line-clamp-4 overflow-hidden text-md'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repellat consequuntur illo nisi facilis, eius
        deserunt? Quidem nulla nobis consequuntur soluta nemo harum delectus optio iste repellat autem velit, officiis
        exercitationem laborum similique suscipit ipsum culpa ipsam. Totam sequi, voluptatem repellendus omnis beatae
        quam nemo repellat, incidunt corporis perspiciatis inventore ex impedit dolorem ea optio soluta voluptas quo vel
        dolorum quae? Ipsam vero dolorum repudiandae mollitia veniam molestiae porro repellat nisi ea, aperiam culpa ut
        eveniet quo iste dolorem et laudantium. Dignissimos quas recusandae aliquid harum doloremque laudantium ducimus
        architecto a sed labore placeat blanditiis sint magni, dicta odit. Sint.
      </div>
      <HeartButton className={'h-min absolute top-3 right-3'} />
    </div>
  );
};

export default QuotationCard;
