import React from 'react';
import { Button } from 'primereact/button';
import TableSearchBox from './TableSearchBox';

const CustomTable = ({ title, columns, children, refreshList }) => {
  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0" />
              </div>
              <div className="white_card_body">
                <div className="QA_section">
                  <div className="white_box_tittle list_header">
                    <h4>{title}</h4>
                    <div className="box_right d-flex lms_block" style={{ justifyContent: 'space-between' }}>
                      <div className="serach_field_2">
                        <div className="search_inner">
                          <TableSearchBox />
                        </div>
                      </div>
                      <Button
                        label="Refresh list"
                        className="text-xs bg-pink-500 border-pink-500"
                        onClick={(ev) => {
                          ev.preventDefault();
                          refreshList();
                        }}
                      />
                    </div>
                  </div>
                  <div className="QA_table mb_30">
                    <table className="table lms_table_active ">
                      <thead>
                        <tr>
                          {columns.map((key) => (
                            <th key={key} scope="col" className="text-pink-500">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {children}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12" />
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
