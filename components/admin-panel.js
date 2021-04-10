import proptypes from '../lib/proptypes';

export default function AdminPanel({ children }) {
  const B = 'admin-panel';

  return (
    <div className={B}>
      {children}

      <style jsx>
        {`
        .${B} {
          padding: 10px;
        }
        `}
      </style>
    </div>
  );
}

AdminPanel.propTypes = {
  children: proptypes.node.isRequired,
};
