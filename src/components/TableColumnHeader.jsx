import { GoChevronDown } from "react-icons/go";
import classNames from "classnames";

const TableColumnHeader = ({
	text,
	active,
	alignRight,
	sortAscending,
	onClick,
}) => {
	return (
		<th scope="col" onClick={onClick}>
			<div
				className={classNames("d-flex", {
					"justify-content-end": alignRight,
				})}
			>
				<span className={classNames({ "text-right": alignRight })}>
					{text}
				</span>
				<GoChevronDown
					className={classNames(
						"flex-shrink-0",
						"align-self-center",
						{ invisible: !active, rotate: sortAscending }
					)}
					size={12}
				/>
			</div>
		</th>
	);
};

export default TableColumnHeader;
