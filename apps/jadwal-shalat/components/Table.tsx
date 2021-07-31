import React  from 'react';
import {useTable} from 'react-table'
import styles from '../styles/Table.module.css'

function Table({schedule}) {
    return (
        <div className={styles.table_container}>
            <table>
                <tbody>
                    <tr>
                        <th>Tengah Malam</th>
                        <td>{schedule.midnight}</td>
                    </tr>
                    <tr>
                        <th>Imsak</th>
                        <td>{schedule.imsak}</td>
                    </tr>
                    <tr>
                        <th>Fajar</th>
                        <td>{schedule.fajr}</td>
                    </tr>
                    <tr>
                        <th>Terbit Matahari</th>
                        <td>{schedule.sunrise}</td>
                    </tr>
                    <tr>
                        <th>Dzuhur</th>
                        <td>{schedule.dhuhr}</td>
                    </tr>
                    <tr>
                        <th>Ashar</th>
                        <td>{schedule.asr}</td>
                    </tr>
                    <tr>
                        <th>Tenggelam Matahari</th>
                        <td>{schedule.sunset}</td>
                    </tr>
                    <tr>
                        <th>Maghrib</th>
                        <td>{schedule.maghrib}</td>
                    </tr>
                    <tr>
                        <th>Isya&apos;</th>
                        <td>{schedule.isha}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table