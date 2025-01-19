interface TagType {
    tagType: string;
}

export default function Tag(props:TagType) {
  return (
    <div className={"rounded-2xl w-fit flex px-3 " + props.tagType}>
        <p>{props.tagType}</p>
    </div>
  )
}